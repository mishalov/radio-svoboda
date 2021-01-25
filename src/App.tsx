import React, { useCallback, useEffect, useState } from "react";
import styles from "./App.module.scss";
import { Layout, List } from "antd";
import "./styles/_general.scss";
import ApplicationHeader from "./components/atoms/ApplicationHeader";
import "antd/dist/antd.min.css";
import "reset-css";
import { RouteComponentProps, withRouter } from "react-router-dom";
import TTag from "./types/TTag";
import splitIntoTags from "./components/utils/splitIntoTags";
import buildHashOfTags from "./components/utils/buildHashOfTags";
import removeTagFromList from "./components/utils/removeTagFromList";
import ApplicationFooter from "./components/molecules/ApplicationFooter";
import findColorByName from "./components/utils/findColorByName";

const { Content } = Layout;

const App: React.FC<RouteComponentProps> = (props) => {
  const { location, history } = props;
  const [list, setList] = useState<TTag[]>([]);

  /**
   * Application have SINGLE SOURCE OF DATA:
   * location hash
   */
  useEffect(() => {
    const { hash } = location;
    setList(splitIntoTags(hash));
    console.log(1);
  }, [location]);

  const updateHash = useCallback(
    (newList: TTag[]) => {
      const newHash = buildHashOfTags(newList);
      history.push(newHash);
    },
    [history]
  );

  /**
   * Function to remove tag from list and hash
   */
  const handleRemoveTag = useCallback(
    (tagObject: TTag) => () => {
      const newList = removeTagFromList(list, tagObject);
      updateHash(newList);
    },
    [list, updateHash]
  );

  const handleAddTag = (tagObject: TTag) => {
    updateHash(list.concat(tagObject));
  };

  /**
   * Function to render single list item
   * @param tagItem
   */
  const renderListItem = (tagItem: TTag) => {
    const possibleColor = findColorByName(tagItem);
    return (
      <List.Item
        onClick={handleRemoveTag(tagItem)}
        className={styles.list_item}
        style={{
          background: `linear-gradient(90deg, ${possibleColor?.hex}, #f6edb2)`,
        }}
      >
        <p>{tagItem.tag}</p>
      </List.Item>
    );
  };

  return (
    <Layout className={styles.layout}>
      <Content className={styles.content}>
        <div>
          <ApplicationHeader>Svobodná Evropa</ApplicationHeader>
          <div className={styles.list}>
            <List bordered dataSource={list} renderItem={renderListItem} />
          </div>
        </div>

        <ApplicationFooter onTagCreate={handleAddTag} />
      </Content>
    </Layout>
  );
};

export default withRouter(App);
