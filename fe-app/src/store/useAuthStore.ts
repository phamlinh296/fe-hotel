import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import toast from 'react-hot-toast';
import type {
    User,
    LoginPayload,
    SignupPayload,
    UpdateProfilePayload,
} from '@/types/profile';
import api from '@/api/axios'; // axios instance

interface AuthState {
    authUser: User | null;
    isLoggingIn: boolean;
    isSigningUp: boolean;
    isUpdatingProfile: boolean;

    login: (data: LoginPayload) => Promise<void>;
    logout: () => Promise<void>;
    signup: (data: SignupPayload) => Promise<void>;
    updateProfile: (data: UpdateProfilePayload) => Promise<void>;
}

export const useAuthStore = create<AuthState>()(
    persist(
        (set) => ({
            authUser: null,
            isLoggingIn: false,
            isSigningUp: false,
            isUpdatingProfile: false,

            login: async ({ email, password }) => {
                set({ isLoggingIn: true });
                try {
                    const { data } = await api.post('/guest/login', {
                        email,
                        password,
                    });
                    localStorage.setItem('token', data.token); // giả sử trả về token
                    set({ authUser: data.user });
                    toast.success('Đăng nhập thành công');
                } catch (error) {
                    toast.error('Sai email hoặc mật khẩu');
                    console.error('Login error:', error);
                    throw error;
                } finally {
                    set({ isLoggingIn: false });
                }
            },

            logout: async () => {
                try {
                    const token = localStorage.getItem('token');
                    if (token) {
                        await api.post(
                            '/guest/logout',
                            {},
                            {
                                headers: { Authorization: `Bearer ${token}` },
                            },
                        );
                    }
                } catch (error) {
                    // Có thể ignore báo lỗi logout
                    console.error('Logout error:', error);
                } finally {
                    localStorage.removeItem('token');
                    set({ authUser: null });
                    toast.success('Đã đăng xuất');
                    window.location.href = '/login';
                }
            },

            signup: async (data) => {
                set({ isSigningUp: true });
                try {
                    const { data: res } = await api.post(
                        '/guest/register',
                        data,
                    );
                    localStorage.setItem('token', res.token);
                    set({ authUser: res.user });
                    toast.success('Tạo tài khoản thành công');
                } catch (error) {
                    toast.error('Đăng ký thất bại');
                    console.error('Signup error:', error);
                } finally {
                    set({ isSigningUp: false });
                }
            },

            updateProfile: async (data) => {
                set({ isUpdatingProfile: true });
                try {
                    const token = localStorage.getItem('token');
                    const { data: res } = await api.put(
                        '/guest/profile',
                        data,
                        {
                            headers: { Authorization: `Bearer ${token}` },
                        },
                    );
                    set({ authUser: res.user });
                    toast.success('Cập nhật hồ sơ thành công');
                } catch (error) {
                    toast.error('Không thể cập nhật hồ sơ');
                    console.error('Update profile error:', error);
                } finally {
                    set({ isUpdatingProfile: false });
                }
            },
        }),
        {
            name: 'luxe-auth-storage', // key lưu trong localStorage
        },
    ),
);