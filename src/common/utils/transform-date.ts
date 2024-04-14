import moment from "moment";

export const transformDate = (date: Date) => {
    const formattedDate = moment(date).format('DD/MM/YYYY');
    return formattedDate

}