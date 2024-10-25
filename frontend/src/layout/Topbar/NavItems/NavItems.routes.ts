export type NavItem = {
  label: string;
  href: string;
  disable: boolean;
};

export const routes: NavItem[] = [
  {
    label: 'Busca avançada',
    href: '/busca-avancada',
    disable: false,
  },
  {
    label: 'Super Artistas Cadastrados',
    href: '/artistas-cadastrados',
    disable: false,
  },
];
