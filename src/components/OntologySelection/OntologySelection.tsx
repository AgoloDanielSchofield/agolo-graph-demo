import { Empty, Spin, Tree } from 'antd';
import { IOntologySelection } from '../../models/esg-components.model';
import './OntologySelection.scss';

const { TreeNode } = Tree;

const OntologySelection = (props: IOntologySelection) => {
  const { topics, isFetchingTopicsList, setSelectedSubtopics } = props;

  const onCheck = (_: any, e: any) => {
    const checkedSuptopics = e.checkedNodes
      .filter((node: any) => !node.children)
      .map((node: any) => node.title);
    setSelectedSubtopics(checkedSuptopics);
  };

  const getSortedSubtopics = (subtopics: string[]) =>
    subtopics.sort((a, b) => a.toLowerCase().localeCompare(b.toLowerCase()));

  return (
    <div className="ontology-tree-wrapper">
      <span className="title">Include Ontologies: </span>
      {topics?.length ? (
        topics.map((topic) => (
          <Tree
            checkable
            defaultSelectedKeys={topic.subtopics}
            defaultCheckedKeys={topic.subtopics}
            onCheck={onCheck}
            key={`${topic.name}-tree`}
            selectable={false}
          >
            <TreeNode title={topic.name} key={topic.name}>
              {getSortedSubtopics(topic.subtopics).map((subtopic) => (
                <TreeNode title={subtopic} key={subtopic} />
              ))}
            </TreeNode>
          </Tree>
        ))
      ) : (
        <div className="empty-topics-wrapper">
          {isFetchingTopicsList ? (
            <Spin />
          ) : (
            <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
          )}
        </div>
      )}
    </div>
  );
};

export default OntologySelection;
