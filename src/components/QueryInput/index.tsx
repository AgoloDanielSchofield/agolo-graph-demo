import { Input } from 'antd';
import { IQueryInput } from '../../models/esg-components.model';
import './QueryInput.scss';

const QueryInput = (props: IQueryInput) => {
  const { placeholder, title, query, setQuery } = props;
  return (
    <div className="query-input-container">
      <span className="title">{title}</span>
      <Input
        placeholder={placeholder}
        value={query}
        onChange={(e) => {
          setQuery(e.target.value);
        }}
      />
    </div>
  );
};

export default QueryInput;
