export class ExampleService {
  async getExample(): Promise<string> {
    const message = "Data Fetch from service";
    return message;
  }
}
