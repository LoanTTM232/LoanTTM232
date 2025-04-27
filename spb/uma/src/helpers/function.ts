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
