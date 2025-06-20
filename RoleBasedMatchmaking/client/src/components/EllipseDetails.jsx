import { Card, Descriptions, Skeleton } from "antd";

const EllipseDetails = ({ items }) => {
  return (
    <Card size="default"
          title="Ellipse Details">
      {items == null || items.length <= 0 &&
        <Skeleton active />
      }

      {items != null && items.length > 0 &&
        <Descriptions items={items} />
      }
    </Card>
  );
};

export default EllipseDetails;