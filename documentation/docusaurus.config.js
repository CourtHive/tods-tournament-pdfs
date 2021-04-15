/** @type {import('@docusaurus/types').DocusaurusConfig} */
module.exports = {
  title: 'Tournament PDFs',
  tagline: 'Draw Structures and Reports',
  url: 'https://courthive.github.io',
  baseUrl: '/tods-tournament-pdfs/',
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',
  favicon: 'img/favicon.ico',
  organizationName: 'CourtHive',
  projectName: 'tods-tournament-pdfs',
  themeConfig: {
    navbar: {
      title: 'Tournament PDFs',
      logo: {
        alt: 'CourtHive',
        src: 'img/CourtHive.png',
      },
      items: [
        {
          to: 'docs/',
          activeBasePath: 'docs',
          label: 'Docs',
          position: 'left',
        },
        // { to: 'blog', label: 'Blog', position: 'left' },
        {
          href: 'https://github.com/CourtHive/tods-tournament-pdfs',
          label: 'GitHub',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
      /*
      links: [
        {
          title: 'Docs',
          items: [
            {
              label: 'Tournament PDFs',
              to: 'docs/',
            },
          ],
        },
        {
          title: 'Community',
          items: [
            {
              label: 'Stack Overflow',
              href: 'https://stackoverflow.com/questions/tagged/docusaurus',
            },
            {
              label: 'Discord',
              href: 'https://discordapp.com/invite/docusaurus',
            },
            {
              label: 'Twitter',
              href: 'https://twitter.com/docusaurus',
            },
          ],
        },
        {
          title: 'More',
          items: [
            {
              label: 'Blog',
              to: 'blog',
            },
            {
              label: 'GitHub',
              href: 'https://github.com/facebook/docusaurus',
            },
          ],
        },
      ],
      */
      copyright: `Copyright © ${new Date().getFullYear()} CourtHive`,
    },
  },
  presets: [
    [
      '@docusaurus/preset-classic',
      {
        docs: {
          sidebarPath: require.resolve('./sidebars.js'),
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      },
    ],
  ],
};
