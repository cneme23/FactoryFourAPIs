export const DateUtils = {
  formatToLocalTime: (dateTimeMiliseconds: any) => new Date(dateTimeMiliseconds).toString().split(" ")[4],
}