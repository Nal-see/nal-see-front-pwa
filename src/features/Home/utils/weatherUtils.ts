import GoodBadge from '@/assets/icons/badge_good.svg';
import NormalBadge from '@/assets/icons/badge_normal.svg';
import BadBadge from '@/assets/icons/badge_bad.svg';
import TooBadBadge from '@/assets/icons/badge_tooBad.svg';

export const switchPm10Icon = (figure: number) => {
  switch (true) {
    case figure <= 30:
      return GoodBadge;
    case figure > 30 && figure <= 80:
      return NormalBadge;
    case figure > 80 && figure <= 150:
      return BadBadge;
    case figure > 150:
      return TooBadBadge;
  }
};

export const switchPm25Icon = (figure: number) => {
  switch (true) {
    case figure <= 15:
      return GoodBadge;
    case figure > 15 && figure <= 35:
      return NormalBadge;
    case figure > 35 && figure <= 75:
      return BadBadge;
    case figure > 75:
      return TooBadBadge;
  }
};
