import { INavData } from '@coreui/angular';

export const navItems: INavData[] = [
  {
    name: 'Dashboard',
    url: '/dashboard',
    iconComponent: { name: 'cil-speedometer' },
   
  },
  {
    name: 'Country List',
    url: '/country',
    iconComponent: { name: 'cil-apps' }
  },
];
