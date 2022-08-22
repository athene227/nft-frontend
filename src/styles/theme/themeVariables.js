import image from './images/snake.svg';
import imageLight from './images/snake-light.svg';
import liveAuctionbg from './images/liveauction-bg.png';
const bgPrimaryColor = "#ffffff";
const white = "#ffffff";
const black = "#111";
const gray = "#bbb";
const lightGray = "#ddd";
const darkBlack = "#000000";

const general = "#a2a2a2";
const khaki = "#636363";
const blackSoft = "#333";
const blackCol = "#2e333c";
const blackLit = "#0e1e45";
const blackMore = "#0f0f0f";
const blue = "#0084fe";
// const pink_soft = "#fe00c7";
const pinkCol = "#d61f8b";
// const color = "#FE00C7";
const colorPrimary = "#fe00c7";
const colorMore = "#fc202c";
const roundBtnSize = "35px";
const colorSecondary = "#0084fe";
const colorBgPrimary = "#06132d";
const colorBgSecondary = "#0e1e45";
const colorBgSecondaryDark = "#050f23";
const btnFont = "16px";
const btnBorder = "10px";
const colorPlaceholder = "#6670a6";
const background = "#020b1d";
const backgroundLight = "#edf3ff";
const searchGrad1 = "#f405c9";
const searchGrad2 = "#3993ff";
const searchBgLight = "#edf3ff";
const textLight = "#7a8396";
const textBtnLight = "#06132d";
const textHeadingLight = "#06132d";
const textHeadingDark = '#ffffff';
const navstickyDark = "#171c27";
const navstickyLight = "#fcfdff";
const bannerLayer = "#f9fbff";
// Gradient colors
const gradient1 = "linear-gradient(90deg, rgba(244, 5, 201, 0.2) -1.88%, rgba(57, 147, 255, 0.2) 129.09%)";
const gradient2 = "linear-gradient(90deg, rgba(254, 0, 199, 0.2) 0%, rgba(0, 132, 254, 0.2) 103.82%)";
const gradient3 = "linear-gradient(to left, #d61f8b, #fc202c)";
const gradient4 = "linear-gradient(to bottom, #d61f8b, #fc202c)";
// const gradient-color1 = "#fe00c7;
// const gradient-color2 = "#0084fe;
const gradientColor3 = "rgba(244, 5, 201, 0.2)";
const gradientColor4 = "rgba(244, 5, 201, 0.2)";
const btnBoxshadow = "#f5e6fa";
const btnBoxshadowdark = "#0e1e45";
// Gradient colors

// variables from news items
const newItemBg = "linear-gradient(90deg, rgba(244, 5, 201, 0.07) -1.88%, rgba(57, 147, 255, 0.07) 129.09%)";
const boxShadow = "rgba(4, 15, 37, 0.2)";
const itemPriceColor = "#00b2fe";
const itemBorderColor = "#282a53";



const light = {
  name: 'light',
  colors: {
    'bannerImage': imageLight,
    'liveAuctionBgs': 'none',
    "bg_primary_color":bgPrimaryColor,
    'white' : white,
    'black' : black,
    'gray' : gray,
    'light-gray': lightGray,
    'darkBlack': darkBlack,
    'general': textLight,
    'khaki': khaki,
    'black_soft': blackSoft,
    'black_col': blackCol,
    'black_lit': blackLit,
    'black_more': blackMore,
    'blue': blue,
    'pink_col': pinkCol,
    'color_primary': colorPrimary,
    'color_more': colorMore,
    'round_btn_size': roundBtnSize,
    'color_secondary': colorSecondary,
    'color_bg_primary': colorBgPrimary,
    'color_bg_secondary': colorBgSecondary,
    'color_bg_secondary_dark': colorBgSecondaryDark,
    'btn_font': btnFont,
    'btn_border': btnBorder,
    'color_placeholder': colorPlaceholder,
    'background': backgroundLight,
    // 'background_light': backgroundLight,
    'search-grad1': searchGrad1,
    'search-grad2': searchGrad2,
    'search-bg-light': searchBgLight,
    'text-light': textLight,
    'text-btn-light': textBtnLight,
    // 'text-heading-light': textHeadingLight,
    'navBg' : 'rgba(241, 251, 255, 0.8)',
    'navColor': darkBlack,
    'navsticky': navstickyLight,
    'navWhitebs': '0 4px 20px 0 rgba(241, 235, 252, 0.8)',
    'bannerLayer': bannerLayer,
    'white_black': black,
    'textHeading': textHeadingLight,
    // Gradient colors
    'gradient1': gradient1,
    'gradient2': gradient2,
    'gradient-color3': gradientColor3,
    'gradient-color4': gradientColor4,
    // Gradient colors
    'gradient3toLeft': gradient3,
    'gradient3toBottom': gradient4,
    // variables from news items
    'new__item_bg': newItemBg,
    'box_shadow': boxShadow,
    'item__price_color': itemPriceColor,
    'item__border_color': itemBorderColor,
    'btn_bx_shadow': btnBoxshadow,
    'slick_nav_bg' : 'white',
    'nft_custom_bg': white,
    'transparent_border' : 'transparent',
    'nft_light_bxshadow': '10px 10px 20px #DBE6FD',
    'fiter_button_bg': '#e3e7fc',
    'popover_bottom': '#e3e7fc',
    'swiper_btn_fill': white,
    'swiper_btn_stroke': white,
    'swiper_btn_path': '#0e1e45',
    'form_control_bg': white,
    'stats-bg': '#12121280',
    'live-bg-shadow': '#040f2526',
    'live-bg-color': '#ffffff',
    'collection-item-bg': white,
    'scrollbar-trackbg':'rgb(6, 19, 45, 0.1)',
    'scrollbar-thumbbg':'#19baff',
    'top-collection-image': 'none!important',
    'footerBg': '#f7f8ff',

  }
};
const dark = {
  name: "dark",
  colors:{
    'bannerImage': image,
    'liveAuctionBg': liveAuctionbg,
    "bg_primary_color":bgPrimaryColor,
    'white' : white,
    'black' : black,
    'gray' : gray,
    'light-gray': lightGray,
    'darkBlack': darkBlack,
    'general': general,
    'khaki': khaki,
    'white_black': white,
    'black_soft': blackSoft,
    'black_col': blackCol,
    'black_lit': blackLit,
    'black_more': blackMore,
    'blue': blue,
    'pink_col': pinkCol,
    'color_primary': colorPrimary,
    'color_more': colorMore,
    'round_btn_size': roundBtnSize,
    'color_secondary': colorSecondary,
    'color_bg_primary': colorBgPrimary,
    'color_bg_secondary': colorBgSecondary,
    'color_bg_secondary_dark': colorBgSecondaryDark,
    'btn_font': btnFont,
    'btn_border': btnBorder,
    'color_placeholder': colorPlaceholder,
    'background': background,
    // 'background_light': backgroundLight,
    'search-grad1': searchGrad1,
    'search-grad2': searchGrad2,
    'search-bg-light': searchBgLight,
    'text-light': white,
    'text-btn-light': white,
    'text-heading-light': textHeadingLight,
    'navBg' : 'rgba(0,0,0,0)',
    'navColor': white,
    'navsticky': navstickyDark,
    'navWhitebs': '0 4px 20px 0 rgba(10, 10, 10, 0.8)',
    'bannerLayer': 'none',
    'textHeading': textHeadingDark,
    // Gradient colors
    'gradient1': gradient1,
    'gradient2': gradient2,
    'gradient3toLeft': gradient3,
    'gradient3toBottom': gradient4,
    'gradient-color3': gradientColor3,
    'gradient-color4': gradientColor4,
    // Gradient colors
    // variables from news items
    'new__item_bg': newItemBg,
    'box_shadow': boxShadow,
    'item__price_color': itemPriceColor,
    'item__border_color': itemBorderColor,
    'btn_bx_shadow': btnBoxshadowdark,
    'slick_nav_bg' : '#171c27',
    'nft_custom_bg': '#040F25',
    'fiter_button_bg': 'rgba(4, 4, 5, 0.08)',
    'popover_bottom': '#171c26',
    'swiper_btn_fill': '#0e1e45',
    'swiper_btn_stroke': white,
    'swiper_btn_path': white,
    'form_control_bg': background,
    'stats-bg': '#12121280',
    'live-bg-shadow': '#040f2526',
    'live-bg-color': '#0e1e45',
    'collection-item-bg': 'rgba(255, 255, 255, 0.04)',
    'scrollbar-trackbg':'rgb(255, 255, 255, 0.1)',
    'scrollbar-thumbbg':'#00b2fe',
    'top-collection-image': 'none',
    'footerBg': 'rgba(255, 255, 255, 0.025)',
  }
};
export { dark, light };
