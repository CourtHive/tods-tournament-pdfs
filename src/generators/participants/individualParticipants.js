import { styles } from '../../styles/standardTable';
import { standardTable } from '../tables/standardTable';

export function individualParticipants(args) {
  const { participants = [], gender } = args;

  const rowData = participants
    .map(participant => {
      const person = participant?.person;
      return {
        lastName: person?.standardFamilyName,
        firstName: person?.standardGivenName,
        ioc: person?.nationalityCode,
        sex: person?.sex,
      };
    })
    .filter(row => !gender || row.sex === gender);

  const rowProfile = [
    {
      headerText: '#',
      headerStyle: 'centeredTableHeader',
      width: 'auto',
      dataStyle: 'centeredColumn',
      index: true,
    },
    {
      headerText: 'Last Name',
      headerStyle: 'tableHeader',
      width: 'auto',
      dataAttribute: 'lastName',
    },
    {
      headerText: 'First Name',
      headerStyle: 'tableHeader',
      width: 'auto',
      dataAttribute: 'firstName',
    },
    {
      headerText: 'IOC',
      headerStyle: 'centeredTableHeader',
      width: 'auto',
      dataStyle: 'centeredColumn',
      dataAttribute: 'ioc',
    },
    {
      headerText: 'Rank',
      headerStyle: 'centeredTableHeader',
      width: 'auto',
      dataAttribute: 'rank',
    },
    {
      headerText: 'Status',
      headerStyle: 'centeredTableHeader',
      width: 'auto',
      dataAttribute: 'status',
    },
    {
      headerText: 'Order',
      headerStyle: 'centeredTableHeader',
      width: 35,
      dataAttribute: 'order',
    },
    { headerText: 'Signature', headerStyle: 'tableHeader', width: '*' },
  ];

  return standardTable({ rowData, rowProfile, styles });
}
