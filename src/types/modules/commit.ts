// Define commit fields.
export enum CommitFieldsEnum {
	ActionType = 'type', // Type of action.
	Component = 'component', // Component, if any.
	Title = 'title', // Title of the commit.
	Description = 'description', // Full description of the commit.
	BreakingChanges = 'breaking', // Breaking changes.
	RelatedIssues = 'issues', // Related issues, if any.
	Comment = 'comment', // Comment or remark.
}

// Define commit fields values.
export type CommitFieldsValues = `${CommitFieldsEnum}`;
