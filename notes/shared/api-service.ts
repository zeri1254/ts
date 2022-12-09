export class ApiService {
  baseUrl
  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }
  doRequest(url: string, options: RequestInit) {
    return fetch(url, options).then(async (res) => {
      if (res.status === 401) {
        const redirectUrl = await res.text();
        if (redirectUrl) {
          window.location.href = redirectUrl;
        }
        throw Error ('unauthorized');
      }
      return res;
    });
  }
  getNotes() {
    return this.doRequest(this.baseUrl, { credentials: 'include' }).then((res) => res.json());
  }
  addNote(heading: string, content: string) {
    return this.doRequest(this.baseUrl, {
      method: "POST",
      headers: {
        ["Content-type"]: "application/json",
      },
      body: JSON.stringify({
        heading,
        content,
      }),
      credentials: 'include',
    }).then((res) => res.text());
  }
  editNote(heading: string, content: string, id: number) {
    return this.doRequest(`${this.baseUrl}/${id}`, {
      method: "PUT",
      headers: {
        ["Content-type"]: "application/json",
      },
      body: JSON.stringify({
        heading,
        content,
      }),
      credentials: 'include',
    }).then((res) => res.text());
  }

  removeNote(id: number) {
    return this.doRequest(`${this.baseUrl}/${id}`, {
      method: "DELETE",
      credentials: 'include',
    }).then((res) => res.text())
  }
}
