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
    name: string;
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

  static fromPersistence(props: {
    id: string;
    documentId: string;
    name: string;
    extractedContent?: string;
    summary?: string;
    createdAt: Date;
  }): SearchableDocument {
    return new SearchableDocument(props.id, {
      documentId: props.documentId,
      name: props.name,
      extractedContent: props.extractedContent,
      summary: props.summary,
      createdAt: props.createdAt,
    });
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

  public indexKnowledge(props: {
    extractedContent: string;
    summary: string;
  }): void {
    this.props.extractedContent = props.extractedContent;
    this.props.summary = props.summary;
  }
}
