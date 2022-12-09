export class ApiService {
  constructor(baseUrl) {
    this.baseUrl = baseUrl;
  }
  doRequest(url, options) {
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
  addNote(heading, content) {
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
  editNote(heading, content, id) {
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

  removeNote(id) {
    return this.doRequest(`${this.baseUrl}/${id}`, {
      method: "DELETE",
      credentials: 'include',
    }).then((res) => res.text())
  }
}
