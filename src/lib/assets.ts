/* Centralised asset paths. All files live under /public and are real,
   approved captures from the V2 source set, except where noted as built mocks
   (AudienceSeed, AI Growth Studio, Measure dashboards are built in-app). */

const base = import.meta.env.BASE_URL;
const a = (p: string) => `${base}${p}`;

export const ASSETS = {
  // Inspirelabs identity
  lockupInk: a('logos/il-lockup.png'),
  lockupInkTagline: a('logos/lockup-ink-tagline.png'),
  lockupInkDark: a('logos/lockup-ink.png'),
  // Tight-cropped white wordmark + gridmark on the --ink (#0e0f0a) background,
  // for dark screens (cover, contact). The source lockup bakes a wide dark
  // margin around the mark, so it rendered small; this crop fills the frame.
  wordmarkDark: a('logos/inspirelabs-wordmark-dark.png'),
  wordmarkInk: a('logos/wordmark-ink.png'),
  symbolLight: a('logos/symbol-light-lg.png'),
  symbolInk: a('logos/symbol-ink.png'),

  // Product logos (platforms)
  grabonLogo: a('logos/platforms/grabon-logo.svg'),
  grabcashLogo: a('logos/platforms/grabcash-logo.svg'),
  grabshareLogo: a('logos/platforms/grabshare-logo.svg'),
  rankdriveLogo: a('logos/platforms/rankdrive-logo.png'),
  writegeniusLogo: a('logos/platforms/writegenius-logo.png'),
  alternativesLogo: a('logos/platforms/alternatives-logo.png'),
  inspirelabsWordmark: a('logos/platforms/inspirelabs-wordmark.png'),

  // GrabOn surfaces (real captures)
  grabonHome: a('assets/grabon_home.jpg'),
  grabonCategory: a('assets/grabon_category.png'),
  grabonMerchant: a('assets/grabon_merchant.png'),
  grabonCatFashion: a('assets/grabon/grabon_category_fashion.png'),
  grabonMerchantMyntra: a('assets/grabon/grabon_merchant_myntra.png'),
  catBeauty: a('assets/grabon/cat_beauty.png'),
  catElectronics: a('assets/grabon/cat_electronics.png'),
  catTravel: a('assets/grabon/cat_travel.png'),
  catEntertainment: a('assets/grabon/cat_entertainment.png'),

  // Owned distribution (real captures)
  grabcashDeals: a('assets/grabcash_deals.png'),
  grabshareCreator: a('assets/grabshare_creator.png'),
  grabshareHome: a('assets/grabshare_home.png'),
  grabshareMain: a('assets/grabshare_main.png'),
  grabshareWeb: a('assets/grabshare_web.jpg'),

  // Activation surfaces (real captures)
  partner1: a('assets/partner_surface1.png'),
  partner2: a('assets/partner_surface2.png'),
  partner3: a('assets/partner_surface3.png'),
  telegramPost: a('assets/telegram_channel_post.jpg'),
  telegramReport: a('assets/telegram_report.png'),
  telegramAd: a('assets/telegram_ad.jpg'),

  // AI Growth Studio (real product captures)
  rankdriveDash: a('assets/rankdrive_dashboard_v2.png'),
  writegeniusDash: a('assets/writegenius_dashboard.png'),
} as const;

export type AssetKey = keyof typeof ASSETS;
