export class Slug {
  public value: string

  constructor(value: string) {
    this.value = value
  }

  static create(text: string) {
    const slugText = text
      .normalize('NFKD')
      .toLowerCase()
      .trim()
      .replace(/\s+/g, '-')
      .replace(/[^\w-]+/g, '')
      .replace(/_/g, '-')
      .replace(/--+/g, '-')
      .replace(/-s/g, '')

    return new Slug(slugText)
  }
}
