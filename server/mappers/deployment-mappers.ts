import { ObjectID } from 'mongodb';

import { IGitHubClient } from '../types/clients/github.client';
import { IMembersRepository } from 'types/repositories/members.repository';
import { IDeploymentPayload } from '../../shared/types/deployment/payloads/deployment';
import { IDeployment } from '../../shared/types/deployment/deployment';
import { IDeploymentMember } from '../../shared/types/deployment/member';
import { IBranch } from '../../shared/types/deployment/branch';
import { isNullOrUndefined } from 'util';

export async function mapDeploymentPayloadToDocument(
  body: IDeploymentPayload,
  gitHubClient: IGitHubClient,
  membersRepo: IMembersRepository): Promise<IDeployment> {
  return {
    name: _validateName(body.name),
    repo: await gitHubClient.getRepo(body.repo.owner, body.repo.name),
    team: await gitHubClient.getTeam(body.teamId),
    dateTime: _validateDateTime(body.dateTime)
  } as IDeployment;
}

function _validateName(name: string) {
  if (!isNullOrUndefined(name) && name.length > 0) {
    return name;
  }
  throw new Error('Invalid name');
}

function _validateDateTime(dateTime: Date) {
  if (!isNullOrUndefined(dateTime)) {
    return dateTime;
  }
  throw new Error('Invalid date');
}
