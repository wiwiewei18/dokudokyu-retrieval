import { AggregateRoot } from 'src/shared/domain/base.aggregate';

interface SearchableDocumentProps {
  documentId: string;
  name?: string;
  extractedContent?: string;
  summary?: string;
  createdAt: Date;
}

export class SearchableDocument extends AggregateRoot<string> {
  private _id: string;
  private props: SearchableDocumentProps;

  private constructor(id: string, props: SearchableDocumentProps) {
    super();
    this._id = id;
    this.props = props;
  }

  public static create(props: {
    documentId: string;
    name?: string;
    extractedContent?: string;
    summary?: string;
  }) {
    const id = crypto.randomUUID();
    const now = new Date();

    const searchableDocument = new SearchableDocument(id, {
      documentId: props.documentId,
      name: props.name,
      createdAt: now,
    });

    return searchableDocument;
  }

  get id(): string {
    return this._id;
  }

  get documentId(): string {
    return this.props.documentId;
  }

  get name(): string | undefined {
    return this.props.name;
  }

  get extractedContent(): string | undefined {
    return this.props.extractedContent;
  }

  get summary(): string | undefined {
    return this.props.summary;
  }

  get createdAt(): Date {
    return this.props.createdAt;
  }
}
