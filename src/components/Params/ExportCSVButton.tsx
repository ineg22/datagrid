import React from 'react';
import { useSelector } from 'react-redux';

import { StateType, PersonType } from '../../types/index';
import { COLUMN_TITLES } from '../../constants/columns';

const ExportCSVButton: React.FC = () => {
  const { persons, transformed } = useSelector((state: StateType) => ({ persons: state.persons, transformed: state.transformed }));
  const actualPersons = transformed ? transformed : persons;

  const downloadCSVData = (): void => {
    const csvContent = 'data:text/csv;charset=utf-8,';
    const titleContent: string = COLUMN_TITLES.join(',') + '\n';
    const personsContent = actualPersons.map((person: PersonType) => COLUMN_TITLES.map(el => person[el]).join(',')).join('\n');
    const encodedUri = encodeURI(csvContent + titleContent + personsContent);
    const hiddenElement = document.createElement('a');
    hiddenElement.href = encodedUri;
    hiddenElement.target = '_blank';
    hiddenElement.download = 'persons.csv';
    hiddenElement.click();
  };

  return (
    <button className="exportCSVButton" title="download data in CSV" onClick={downloadCSVData}>
      export CSV
    </button>
  );
};

export default ExportCSVButton;
