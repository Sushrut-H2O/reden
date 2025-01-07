// export function extractTime(dateString: any) {
//     const date = new Date(dateString);
//     const hours = padZero(date.getHours());
//     const minutes = padZero(date.getMinutes());
//     return `${hours}:${minutes}`;
// }

// function padZero(number: any) {
//     return number.toString().padStart(2, "0")
// }

export function extractTime(dateString: string): string {
    const date = new Date(dateString);
    let hours = date.getHours();
    const minutes = padZero(date.getMinutes());
    const period = hours >= 12 ? 'PM' : 'AM';

    // Convert hours to 12-hour format
    hours = hours % 12;
    hours = hours ? hours : 12; // Handle midnight (0 hours)

    return `${hours}:${minutes} ${period}`;
}

function padZero(number: number): string {
    return number.toString().padStart(2, "0");
}
