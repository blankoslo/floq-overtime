// @flow

import React from 'react';
import { Tabs, Tab } from 'material-ui/Tabs';
import OvertimeTable from '../components/OvertimeTable';
import AddOvertimeContainer from './AddOvertimeContainer';
import { OvertimeGroup } from '../types/Domain';
import '../index.css';

type Props = {
  saveOvertime: Function;
  overtimeGroups: Array<OvertimeGroup>;
  isSaving: boolean;
}


const MobileContainer = ({ overtimeGroups, isSaving, saveOvertime }: Props) => (
  <Tabs>
    <Tab label='Registrer' >
      <AddOvertimeContainer
        isSaving={isSaving}
        saveOvertime={saveOvertime}
      />
    </Tab>
    <Tab label='Oversikt' >
      <OvertimeTable
        overtimeGroups={overtimeGroups}
      />
    </Tab >
  </Tabs >
);

export default MobileContainer;
