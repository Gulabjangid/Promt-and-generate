//Given integer array nums, rotate the array to the right by k steps, where k is non-negative.
//Input: nums = [1,2,3,4,5,6,7], k = 3
// Output: [5,6,7,1,2,3,4]
// Explanation:
// rotate 1 steps to the right: [7,1,2,3,4,5,6]
// rotate 2 steps to the right: [6,7,1,2,3,4,5]
// rotate 3 steps to the right: [5,6,7,1,2,3,4]
 

#include<iostream>
#include<vector>
using namespace std;

int main(){
    vector<int> nums = {1,2,3,4,5,6,7};
    int k = 3;
    
    if(k > nums.size()){
         k = k % nums.size();
        }

    vector<int> temp;
    for(int i = nums.size() - k; i < nums.size(); i++){
        temp.push_back(nums[i]);
        
    }
 

      for(int i = 0; i < nums.size() - k; i++){
        temp.push_back(nums[i]);
    }
       for(int i = 0; i < temp.size(); i++){
        cout << temp[i] << " ";
    }
    
    return 0;

    }

