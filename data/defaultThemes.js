import Theme from '../models/theme';
// id,name,isDark,primary,secondary,background,paper,text, headerText

export default defaultThemes = [
  new Theme(
    'default',
    'Default',
    false,
    '#3f51b5',
    '#f50057',
    '#f5f5f5',
    '#f5f5f5',
    '#212121',
    '#212121',
  ),
  new Theme(
    'darkdefault',
    'Dark',
    true,
    '#3d3d3d',
    '#1d1d1d',
    '#f5f5f5',
    '#f5f5f5',
    '#212121',
    '#212121',
  ),
];
