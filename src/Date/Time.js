export default function (current) {
    const currentDate = new Date(current);
    const now = new Date();
    const isSameMonth =
      now.getFullYear() === currentDate.getFullYear() &&
      now.getMonth() === currentDate.getMonth();
    const isSameWeek = isSameMonth && now.getDay() - currentDate.getDay() >= 0;
    const isSameDay = isSameMonth && now.getDate() === currentDate.getDate();
    if (isSameDay) {
      // Same day HH:MM AM/PM
      return now.toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
      });
    } else if (isSameWeek) {
      return now.toLocaleDateString("en-US", {
        weekday: "short",
        hour: "2-digit",
        minute: "2-digit",
      });
    } else {
      return now.toLocaleDateString("en-us", {
        month: "short",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      });
    }
  }