import { FC } from 'react';

const footerData = [
  {
    title: 'ABOUT',
    links: [
      'How Airbnb Works',
      'Newsroom',
      'Investors',
      'Airbnb Plus',
      'Airbnb Luxe',
    ],
  },
  {
    title: 'COMMUNITY',
    links: [
      'Accessibility',
      'This is not a real site',
      'Its a pretty awesome clone',
      'Referrals Accepted',
      'Abhishek Patel',
    ],
  },
  {
    title: 'HOST',
    links: ['GitHub', 'Vercel', 'Airbnb', 'React', 'NodeJS'],
  },
  {
    title: 'SUPPORT',
    links: [
      'Help Center',
      'Trust & Safety',
      'Say Hi YouTube',
      'Easter Eggs',
      'For the Win',
    ],
  },
];

const Footer: FC = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-y-10 px-32 py-14 bg-gray-100 text-gray-600">
      {footerData.map(({ title, links }) => (
        <div key={title} className="space-y-4 text-xs text-gray-800">
          <h5 className="font-bold">{title}</h5>
          {links.map((link) => (
            <p key={link}>{link}</p>
          ))}
        </div>
      ))}
    </div>
  );
};

export default Footer;
