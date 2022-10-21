export const formResolvers = {
  'Query getForm': 'formLambda',
  'Query getFormBySlug': 'formLambda',
  'Query getForms': 'formLambda',
  'Query getFormAllTabs': 'formLambda',
  'Query getFormRelations': 'formLambda',
  'Query getFormTabRelations': 'formLambda',
  'Mutation createForm': 'formLambda',
  'Mutation updateForm': 'formLambda',
  'Mutation deleteForm': 'formLambda',
  'Query getResponse': 'formLambda',
  'Query getResponseByCount': 'formLambda',
  'Query getResponses': 'formLambda',
  'Mutation createResponse': 'formLambda',
  'Mutation updateResponse': 'formLambda',
  'Mutation deleteResponse': 'formLambda',
  'Query getMyResponses': 'formLambda',
  'Mutation createBulkResponses': 'formLambda',
  'Query getSection': 'formLambda',
  'Mutation createSection': 'formLambda',
  'Mutation updateSection': 'formLambda',
  'Query getCheckUnique': 'formLambda',
  'Mutation resolveCondition': 'formLambda',
  'Mutation checkUniqueBetweenMultipleValues': 'formLambda',
  'Query checkPermission': 'formLambda',
};
