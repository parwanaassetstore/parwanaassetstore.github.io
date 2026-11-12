/** PUBLIC settings, safe to commit. Never add API secrets here. */
export const memberSettings = {
  googleClientId: '486967723897-ho1b0sbvueu9a4bserrpriu2sdv6njc2.apps.googleusercontent.com',
  appsScriptUrl: 'https://script.google.com/macros/s/AKfycbz0QWIxPHVGyDkYQQ3wffcgbdOUk8vl041DKtd-W1zTsHE-Wu2ZZuQFwCCN0ldilVOA/exec',
}
export const memberAccessConfigured = () =>
  memberSettings.googleClientId.endsWith('.apps.googleusercontent.com') &&
  !memberSettings.googleClientId.startsWith('PASTE_') &&
  /^https:\/\/script\.google\.com\/macros\/s\/[-\w]+\/exec$/.test(memberSettings.appsScriptUrl) &&
  !memberSettings.appsScriptUrl.includes('PASTE_')
