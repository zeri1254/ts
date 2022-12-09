export class Note {
  id: number;
  heading: string;
  content: string;
  constructor(id: number, heading: string, content: string) {
    this.id = id;
    this.heading = heading;
    this.content = content;
  }
}