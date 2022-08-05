import * as AWS from 'aws-sdk';
AWS.config.apiVersions = {
  cognitoidentityserviceprovider: '2016-04-18',
};
const cognitoidentityserviceprovider = new AWS.CognitoIdentityServiceProvider({
  region: 'us-east-1',
});

interface ICreateCognitoGroup {
  GroupName: string;
  UserPoolId: string;
  Description?: string;
  Precedence?: number;
  RoleArn?: string;
}

interface IDeleteCognitoGroup {
  GroupName: string;
  UserPoolId: string;
}

interface IGetGroupList {
  UserPoolId: string;
  Limit?: number;
  NextToken?: string;
}

interface IGetUserPoolList {
  MaxResults: number;
  NextToken?: string;
}

interface IGetUsersList {
  GroupName: string;
  UserPoolId: string;
  Limit?: number;
  NextToken?: string;
}

interface IAddRemoveUserToGroup {
  GroupName: string;
  UserPoolId: string;
  Username: string;
}

interface ICreateUser {
  UserPoolId: AWS.CognitoIdentityServiceProvider.AdminCreateUserRequest['UserPoolId'];
  Username: AWS.CognitoIdentityServiceProvider.AdminCreateUserRequest['Username'];
  DesiredDeliveryMediums?: AWS.CognitoIdentityServiceProvider.AdminCreateUserRequest['DesiredDeliveryMediums'];
  UserAttributes?: AWS.CognitoIdentityServiceProvider.AdminCreateUserRequest['UserAttributes'];
  TemporaryPassword?: AWS.CognitoIdentityServiceProvider.AdminCreateUserRequest['TemporaryPassword'];
  MessageAction?: AWS.CognitoIdentityServiceProvider.AdminCreateUserRequest['MessageAction'];
}

interface IUpdateUserAttributes {
  UserPoolId: string;
  Username: string;
  UserAttributes: { Name: string; value?: string }[];
}

interface IDeleteUser {
  UserPoolId: string;
  Username: string;
}

interface IGetUsers {
  Username: string;
  UserPoolId: string;
}

interface IGetGroupListOfUser {
  UserPoolId: string;
  Username: string;
}

export const createCognitoGroup = async (payload: ICreateCognitoGroup) => {
  const params = {
    GroupName: payload.GroupName,
    UserPoolId: payload.UserPoolId,
    Description: payload.Description,
    Precedence: payload.Precedence,
    RoleArn: payload.RoleArn,
  };
  return cognitoidentityserviceprovider.createGroup(params).promise();
};

export const updateCognitoGroup = async (payload: ICreateCognitoGroup) => {
  const params = {
    GroupName: payload.GroupName,
    UserPoolId: payload.UserPoolId,
    Description: payload.Description,
    Precedence: payload.Precedence,
    RoleArn: payload.RoleArn,
  };
  return cognitoidentityserviceprovider.updateGroup(params).promise();
};

export const deleteCognitoGroup = async (payload: IDeleteCognitoGroup) => {
  const params = {
    GroupName: payload.GroupName,
    UserPoolId: payload.UserPoolId,
  };
  return cognitoidentityserviceprovider.deleteGroup(params).promise();
};

export const getGroupList = async (payload: IGetGroupList) => {
  const params = {
    UserPoolId: payload.UserPoolId,
    Limit: payload.Limit,
    NextToken: payload.NextToken,
  };
  return cognitoidentityserviceprovider.listGroups(params).promise();
};

export const getUserPoolsList = async (payload: IGetUserPoolList) => {
  const params = {
    MaxResults: payload.MaxResults,
    NextToken: payload.NextToken,
  };
  return cognitoidentityserviceprovider.listUserPools(params).promise();
};

export const getGroupUserList = async (payload: IGetUsersList) => {
  const params = {
    GroupName: payload.GroupName,
    UserPoolId: payload.UserPoolId,
    Limit: payload.Limit,
    NextToken: payload.NextToken,
  };
  return cognitoidentityserviceprovider.listUsersInGroup(params).promise();
};

export const addUserToGroup = async (payload: IAddRemoveUserToGroup) => {
  const params: AWS.CognitoIdentityServiceProvider.AdminAddUserToGroupRequest = {
    GroupName: payload.GroupName,
    UserPoolId: payload.UserPoolId,
    Username: payload.Username,
  };
  return cognitoidentityserviceprovider.adminAddUserToGroup(params).promise();
};
export const removeUserFromGroup = async (payload: IAddRemoveUserToGroup) => {
  const params = {
    GroupName: payload.GroupName,
    UserPoolId: payload.UserPoolId,
    Username: payload.Username,
  };
  return cognitoidentityserviceprovider.adminRemoveUserFromGroup(params).promise();
};

export const createUser = async (payload: ICreateUser) => {
  const params: AWS.CognitoIdentityServiceProvider.AdminCreateUserRequest = {
    UserPoolId: payload.UserPoolId,
    Username: payload.Username,
    DesiredDeliveryMediums: payload.DesiredDeliveryMediums,
    UserAttributes: payload.UserAttributes,
    TemporaryPassword: payload.TemporaryPassword,
    MessageAction: payload.MessageAction,
  };

  return cognitoidentityserviceprovider.adminCreateUser(params).promise();
};

export const deleteUser = async (payload: IDeleteUser) => {
  const params = {
    UserPoolId: payload.UserPoolId,
    Username: payload.Username,
  };
  return cognitoidentityserviceprovider.adminDeleteUser(params).promise();
};

export const updateUserAttributes = async (payload: IUpdateUserAttributes) => {
  const params = {
    UserPoolId: payload.UserPoolId,
    Username: payload.Username,
    UserAttributes: payload.UserAttributes,
  };
  return cognitoidentityserviceprovider.adminUpdateUserAttributes(params).promise();
};

export const getUserByEmail = async (payload: IGetUsers) => {
  const params = {
    UserPoolId: payload.UserPoolId,
    Username: payload.Username,
  };
  return cognitoidentityserviceprovider.adminGetUser(params).promise();
};

export const isUserAlreadyExist = async (payload: IGetUsers) => {
  try {
    const user = await getUserByEmail({
      UserPoolId: payload.UserPoolId,
      Username: payload.Username,
    });
    return {
      message: true,
      data: user,
      error: null,
    };
  } catch (error) {
    if (error.code === 'UserNotFoundException') {
      return {
        message: false,
        error: null,
      };
    } else {
      return {
        message: false,
        error: error.message,
      };
    }
  }
};

export const getGroupListOfUser = async (payload: IGetGroupListOfUser) => {
  const params = {
    UserPoolId: payload.UserPoolId,
    Username: payload.Username,
  };
  return cognitoidentityserviceprovider.adminListGroupsForUser(params).promise();
};
