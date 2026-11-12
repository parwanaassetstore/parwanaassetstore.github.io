/** PUBLIC settings, safe to commit. Never add API secrets here. */
export const memberSettings = {
  googleClientId: 'PASTE_WEB_CLIENT_ID.apps.googleusercontent.com',
  appsScriptUrl: 'https://script.google.com/macros/s/PASTE_DEPLOYMENT_ID/exec',
}
export const memberAccessConfigured = () =>
  memberSettings.googleClientId.endsWith('.apps.googleusercontent.com') &&
  !memberSettings.googleClientId.startsWith('PASTE_') &&
  /^https:\/\/script\.google\.com\/macros\/s\/[-\w]+\/exec$/.test(memberSettings.appsScriptUrl) &&
  !memberSettings.appsScriptUrl.includes('PASTE_')
