export class Activity {
  id: number;
  name: string;
  description: string;
  url: string;
  active: boolean;

  constructor(id: number, name: string, description: string, url: string, active: boolean) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.url = url;
    this.active = active;
  }
}