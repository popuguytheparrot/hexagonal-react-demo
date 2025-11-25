export class ProductId {
  readonly value: string;

  constructor(value: string) {
    if (!value || value.trim() === '') {
      throw new Error('ProductId cannot be empty');
    }
    this.value = value;
  }

  equals(other: ProductId): boolean {
    return this.value === other.value;
  }

  toString(): string {
    return this.value;
  }
}
