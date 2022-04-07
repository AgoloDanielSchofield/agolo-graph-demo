import { Input } from 'antd';
import { IQueryInput } from '../../models/esg-components.model';

const QueryInput = (props: IQueryInput) => {
  const { placeholder, title, query, setQuery } = props;
  return (
    <div>
      <span>{title}</span>
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
