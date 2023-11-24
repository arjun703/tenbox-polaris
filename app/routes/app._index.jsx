import {
  IndexTable,
  LegacyCard,
  useIndexResourceState,
  Text,
  Badge,
} from '@shopify/polaris';
import React, { useState, useEffect } from 'react';
import {Link} from '@shopify/polaris';

function RowMarkup({orders, selectedResources}){


  const rowMarkup = orders.map(
    (
      {id, order_id, line_items, status},
      index,
    ) => (
      <IndexTable.Row
        id={id}
        key={id}
        selected={selectedResources.includes(id)}
        position={index}
      >
        <IndexTable.Cell>{id}</IndexTable.Cell>
        <IndexTable.Cell>{order_id}</IndexTable.Cell>
        <IndexTable.Cell>{line_items.length}</IndexTable.Cell>
        <IndexTable.Cell>{status}</IndexTable.Cell>
      </IndexTable.Row>
    ),
  );

  return rowMarkup;

}

export default function IndexTableWithBulkActionsExample() {
  const orders = [
    {
      id: '1020',
      order: '#4434',
      date: 'Jul 20 at 4:34pm',
      customer: 'Jaydon Stanton',
      total: '$969.44',
      paymentStatus: <Badge progress="complete">Paid</Badge>,
      fulfillmentStatus: <Badge progress="incomplete">Unfulfilled</Badge>,
    },
    {
      id: '1019',
      order: '#1019',
      date: 'Jul 20 at 3:46pm',
      customer: 'Ruben Westerfelt',
      total: '$701.19',
      paymentStatus: <Badge progress="partiallyComplete">Partially paid</Badge>,
      fulfillmentStatus: <Badge progress="incomplete">Unfulfilled</Badge>,
    },
    {
      id: '1018',
      order: '#1018',
      date: 'Jul 20 at 3.44pm',
      customer: 'Leo Carder',
      total: '$798.24',
      paymentStatus: <Badge progress="complete">Paid</Badge>,
      fulfillmentStatus: <Badge progress="incomplete">Unfulfilled</Badge>,
    },
  ];
  const resourceName = {
    singular: 'order',
    plural: 'orders',
  };

  const {selectedResources, allResourcesSelected, handleSelectionChange} =
    useIndexResourceState(orders);


 const [orders2, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);


  const fetchData = async () => {
    try {
      console.log("fetching data");
      const response = await fetch('https://apps.cartmade.com/bibek-test-folder/tentbox/php/main.php');
      const data = await response.json();
      console.log(data);
      setOrders(data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching orders:', error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData(); // Fetch data when the component mounts
  }, []);






  const promotedBulkActions = [
    {
      content: 'Create shipping labels',
      onAction: () => console.log('Todo: implement bulk edit'),
    },
  ];
  const bulkActions = [
    {
      content: 'Add tags',
      onAction: () => console.log('Todo: implement bulk add tags'),
    },
    {
      content: 'Remove tags',
      onAction: () => console.log('Todo: implement bulk remove tags'),
    },
    {
      content: 'Delete orders',
      onAction: () => console.log('Todo: implement bulk delete'),
    },
  ];

// Render loading state or loaded state
  return (
    <div>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
          <p>Loaded</p>
          {/* Render the Link component */}



          <LegacyCard>
            <IndexTable
              resourceName={resourceName}
              itemCount={orders.length}
              selectedItemsCount={
                allResourcesSelected ? 'All' : selectedResources.length
              }
              onSelectionChange={handleSelectionChange}
              headings={[
                {title: 'Fulfillment ID'},
                {title: 'Order ID'},
                {title: 'Items'},
                {title: 'Status'},
              ]}
              bulkActions={bulkActions}
              promotedBulkActions={promotedBulkActions}
            >
              <RowMarkup  orders = {orders2} selectedResources = {selectedResources}/>
            </IndexTable>
          </LegacyCard>


        </>
      )}
    </div>
  );
}
