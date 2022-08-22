import FacebookRoundedIcon from '@mui/icons-material/FacebookRounded';
import TwitterIcon from '@mui/icons-material/Twitter';
import YouTubeIcon from '@mui/icons-material/YouTube';
import React from 'react';
import { BsSnapchat } from 'react-icons/bs';
import { FaDiscord, FaTiktok } from 'react-icons/fa';

export const socialLinks = [
  {
    name: 'twitter',
    placeholder: 'Paste Twitter link',
    icon: (
      <TwitterIcon
        sx={{
          color: '#6C717C'
        }}
      />
    )
  },
  {
    name: 'youtube',
    placeholder: 'Paste Youtube link',
    icon: (
      <YouTubeIcon
        sx={{
          color: '#6C717C'
        }}
      />
    )
  },
  {
    name: 'discord',
    placeholder: 'Paste Discord link',
    icon: <FaDiscord className={`social_icon`} />
  },
  {
    name: 'facebook',
    placeholder: 'Paste Facebook link',
    icon: (
      <FacebookRoundedIcon
        sx={{
          color: '#6C717C'
        }}
      />
    )
  },
  {
    name: 'ticktok',
    placeholder: 'Paste TikTok link',
    icon: <FaTiktok className={`social_icon`} />
  },
  {
    name: 'snapchat',
    placeholder: 'Paste SnapChat link',
    icon: <BsSnapchat className={`social_icon`} />
  }
];
