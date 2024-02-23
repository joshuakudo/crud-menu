import {
  ChatBubbleLeftEllipsisIcon,
  ChartBarSquareIcon,
  ShoppingCartIcon,
  TagIcon,
  RectangleGroupIcon,

  XMarkIcon,
  StarIcon
} from '@heroicons/react/24/solid'
import { Dialog, Transition } from '@headlessui/react';
import { Fragment, useState } from 'react';
import Market from '../../../assets/Market.png'
import Menu from './Menu';

export interface INavigationChildren {
  name: string
  href: string
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>
}

export interface INavigation {
  name: string
  href: string
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>
  children?: INavigationChildren[]
}


const Sidebar = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true)

  const navigation: INavigation[] = [
    {
      name: 'Dashboard',
      icon: RectangleGroupIcon as React.ComponentType<React.SVGProps<SVGSVGElement>>,
      href: '/dashboard'
    },
    {
      name: 'Product',
      icon: ShoppingCartIcon as React.ComponentType<React.SVGProps<SVGSVGElement>>,
      href: '/product'
    },
    {
      name: 'Analytics',
      icon: ChartBarSquareIcon as React.ComponentType<React.SVGProps<SVGSVGElement>>,
      href: '/analytics'
    },
    {
      name: 'Sale',
      icon: TagIcon as React.ComponentType<React.SVGProps<SVGSVGElement>>,
      href: '/sale'
    },
    {
      name: 'Review',
      icon: StarIcon as React.ComponentType<React.SVGProps<SVGSVGElement>>,
      href: '/review'
    },
    {
      name: 'Chat',
      icon: ChatBubbleLeftEllipsisIcon as React.ComponentType<React.SVGProps<SVGSVGElement>>,
      href: '/chat'
    },
    
  ]
  return <>
    <div className="hidden md:fixed md:inset-y-0 md:flex md:w-64 md:flex-col">
      <div className="w-64 fixed h-screen flex flex-col z-50 duration-300 transition-all ease-linear bg-white">
        <div className="flex items-center mx-auto h-16 mt-6 px-4 pt-4 ">
          <img
            className="h-20 w-20"
            src={Market}
            alt="UpsideToken"
          />
        </div>
        <span className="w-auto flex text-emerald-950 text-xl font-bold mx-auto mt-10 duration-300 transition-all ease-linear cursor-default select-none">
            Admin
          </span>
        <div className='mt-5 h-0 flex-1 overflow-y-auto'>
          <nav className='space-y-2 w-full' aria-label='Sidebar'>
            {navigation.map((item) =>
             <Menu key={item.name} item={item} />
            )}
          </nav>
        </div>
      </div>
    </div>
  </>
}

export default Sidebar;