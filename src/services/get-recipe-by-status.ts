import axios from 'axios';

export async function getProductListByStatus(statusName: string) {
  try {
    let data = JSON.stringify({
      "statusName": statusName
    });

    let config = {
      method: 'post', // Change the method to 'post'
      maxBodyLength: Infinity,
      url: 'https://lmsmhn4kg8.execute-api.us-east-1.amazonaws.com/prod/product-development/status',
      headers: { 
        'Content-Type': 'application/json'
      },
      data: data
    };

    const response = await axios.request(config);

    if (response.status !== 200) {
      throw new Error(`Request failed with status: ${response.status}`);
    }

    return response.data?.Items;
  } catch (error) {
    console.error('Error:', error);
    throw new Error(`API request failed: ${error}`);
  }
}
