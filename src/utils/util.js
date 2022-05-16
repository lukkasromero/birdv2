export const formatTimeStamp = (timestamp) => {
  const EventTime = new Date(timestamp * 1000).toLocaleTimeString([], {
    hourCycle: "h23",
  });
  const eventDate = new Date(timestamp * 1000).toLocaleDateString().split("/");
  const finalDate = [
    eventDate[2],
    ("0" + eventDate[0]).slice(-2),
    ("0" + eventDate[1]).slice(-2),
  ].join("/");
  return `${finalDate} - ${EventTime}`;
};

export const timeDifference = (timestamp) => {
  const msPerMinute = 60 * 1000;
  const msPerHour = msPerMinute * 60;
  const msPerDay = msPerHour * 24;
  const msPerMonth = msPerDay * 30;
  const msPerYear = msPerDay * 365;
  const current = new Date();
  const previous = timestamp * 1000;

  var elapsed = current - previous;

  if (elapsed < msPerMinute) {
    return Math.round(elapsed / 1000) + " seconds ago";
  } else if (elapsed < msPerHour) {
    return Math.round(elapsed / msPerMinute) + " minutes ago";
  } else if (elapsed < msPerDay) {
    return Math.round(elapsed / msPerHour) + " hours ago";
  } else if (elapsed < msPerMonth) {
    return "approximately " + Math.round(elapsed / msPerDay) + " days ago";
  } else if (elapsed < msPerYear) {
    return "approximately " + Math.round(elapsed / msPerMonth) + " months ago";
  } else {
    return "approximately " + Math.round(elapsed / msPerYear) + " years ago";
  }
};

export const timestampToLocalHour = (timestamp) => {
  let date = new Date(timestamp * 1000)
  let hour = (date.getHours() < 10 ? '0' : '') + date.getHours()
  let minute = (date.getMinutes() < 10 ? '0' : '') + date.getMinutes()
  return `${hour}:${minute}`
}

export const timestampToLocalDaily = (timestamp) => {
  let date = new Date(timestamp * 1000)
  let day = (date.getDate() < 10 ? '0' : '') + date.getDate()
  let month = ((date.getMonth() + 1) < 10 ? '0' : '') + (date.getMonth() + 1)
  let year = (date.getFullYear() < 10 ? '0' : '') + date.getFullYear()
  return `${year}.${month}.${day}`
}

export const walletAddressSlicer = (wallet) => {
  if (typeof wallet === "string") {
    return (
      wallet.substring(0, 5) +
      "..." +
      wallet.substring(wallet.length - 5, wallet.length)
    );
  }
};

export const numberWithCommas = (number, tofixed) => {
  if (tofixed) number = Number(number).toFixed(tofixed);

  const str = number.toString().split(".");
  str[0] = str[0].replace(/(\d)(?=(\d{3})+$)/g, "$1,");

  return str.join(".");
};
