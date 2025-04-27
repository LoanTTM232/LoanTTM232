export function unicodeToASCII(str: string): string {
  const map: { [key: string]: string } = {
    a: 'áàảãạâấầẩẫậăắằẳẵặ',
    e: 'éèẻẽẹêếềểễệ',
    i: 'íìỉĩị',
    o: 'óòỏõọôốồổỗộơớờởỡợ',
    u: 'úùủũụưứừửữự',
    y: 'ýỳỷỹỵ',
    d: 'đ',
  };

  let result = str;

  for (const key in map) {
    const regex = new RegExp(`[${map[key]}]`, 'g');
    result = result.replace(regex, key);
  }

  return result;
}

export function numberTimeToDateTime(time: number): Date {
  const date = new Date();
  date.setHours(Math.floor(time), (time % 1) * 60, 0, 0);
  return date;
}

export function stringTimeToDateTime(dateString: string): Date {
  const date = new Date();
  const [hours, minutes] = dateString.split(':').map(Number);
  date.setHours(hours, minutes, 0, 0);
  return date;
}

export function stringTimeToNumberTime(dateString: string): number {
  const [hours, minutes] = dateString.split(':').map(Number);
  return hours + minutes / 60;
}

export function stringDateToDate(dateString: string): Date {
  const date = new Date(dateString);
  return date;
}

export function stringDateToNumberTime(dateString: string): number {
  const date = new Date(dateString);
  return date.getHours() + date.getMinutes() / 60;
}

export function numberTimeToString(time: number): string {
  const hours = Math.floor(time);
  const minutes = Math.round((time % 1) * 60);
  return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}`;
}
