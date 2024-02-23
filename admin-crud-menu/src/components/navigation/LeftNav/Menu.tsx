import { NavLink } from "react-router-dom";
import { INavigation } from ".";
import { classNames } from "../../../utitlities";

export interface IMenu {
  item: INavigation;
}

const Menu = ({ item }: IMenu) => {
  return (
    <>
      <NavLink
        key={item.name}
        to={item.href}
        className={(({ isActive }) => classNames(
          isActive
            ? 'bg-emerald-500 text-emerald-50 w-full'
            : 'text-emerald-950 hover:bg-emerald-500 hover:text-emerald-50',
          'group flex items-center py-3 pl-5 text-lg w-full '
        ))}
      >
        <item.icon
          className="group-hover:text-emerald-50 mr-4 flex-shrink-0 h-10 w-10"
          aria-hidden="true"
        />
        {item.name}
      </NavLink>
    </>
  )
}

export default Menu;