// chua dung den
import { Plane } from 'lucide-react';
import { Link } from 'react-router-dom';

export function ShoppingCartIcon() {
    return (
        <Link
            to='/cart'
            className='hover:bg-accent rounded-md p-2 transition-colors'
        >
            {/* Icon */}
            <Plane className='w-5 h-5 text-gray-600' />
        </Link>
    );
}
