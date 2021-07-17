export default function dateFormat() {
    const days = ['Nedelja', 'Ponedeljak', 'Utorak', 'Sreda', 'Četvrtak', 'Petak', 'Subota'];
    const months = ['Januar', 'Februar', 'Mart', 'April', 'Maj', 'Jun', 'Jul', 
                    'Avgust', 'Septembar', 'Oktobar', 'Novembar', 'Decembar'];
    let date = new Date(arguments[0]);
    const clock = date.toLocaleTimeString('sr-SR', {timeStyle: 'short'});
    const month = months[date.getMonth()];
    const dayWeek = days[date.getDay()];
    let dayMonth = date.getDate();
    dayMonth = dayMonth < 10? '0' + dayMonth : dayMonth;
    const year = date.getFullYear();
    const obj = {
        clock: ' ' + clock,
        dayWeek: ' ' + dayWeek,
        dayMonth: ' ' + dayMonth,
        month: ' ' + month,
        year: ' ' + year,
        comma: ',',
        point: '.', 
        space: ' '
    }
    let dateString = '';
    for(let i = 1; i < arguments.length; i++) {
        dateString = dateString + obj[arguments[i]]
    }
    return dateString;
}