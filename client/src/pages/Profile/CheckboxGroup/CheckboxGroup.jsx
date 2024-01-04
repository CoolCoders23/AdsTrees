/* Helper starter project used : https://codesandbox.io/p/sandbox/gifted-https-z49zs9?file=%2Fsrc%2FApp.js%3A49%2C12 */

import './CheckboxGroup.css';
import React from 'react';
import { Checkbox, Stack } from '@chakra-ui/react';

const categoryData = {
    categories: [
        { id: 'category-1', name: 'Health and Fitness' },
        { id: 'category-2', name: 'Technology' },
        { id: 'category-3', name: 'Fasion and Beauty' },
        { id: 'category-4', name: 'Home and Garden' },
        { id: 'category-5', name: 'Travel and Tourism' },
        { id: 'category-6', name: 'Food and Beverages' },
        { id: 'category-7', name: 'Financial Services' },
        { id: 'category-8', name: 'Education and Learning' },
        { id: 'category-9', name: 'Entertainment and Media' },
        { id: 'category-10', name: 'Automotive Industry' },
    ],
};

export function CategoriesCheckboxes() {
    const [checkedItems, setCheckedItems] = React.useState(
        categoryData.categories.map(() => false),
    );

    const allChecked = checkedItems.every(Boolean);
    const isIndeterminate = checkedItems.some(Boolean) && !allChecked;

    return (
        <Stack pt={3} pl={3}>
            <Checkbox
                isChecked={allChecked}
                isIndeterminate={isIndeterminate}
                colorScheme="green"
                onChange={(e) =>
                    setCheckedItems(categoryData.categories.map(() => e.target.checked))
                }
            >
                <span style={{ color: 'white' }}>All</span>
            </Checkbox>

            <Stack pl={6} spacing={1}>
                {categoryData.categories.map((category, index) => (
                    <Checkbox
                        key={category.id}
                        isChecked={checkedItems[index]}
                        colorScheme="green"
                        onChange={(e) =>
                            setCheckedItems([
                                ...checkedItems.slice(0, index),
                                e.target.checked,
                                ...checkedItems.slice(index + 1),
                            ])
                        }
                        className="white-label"
                    >
                        <span style={{ color: 'white' }}>{category.name}</span>
                    </Checkbox>
                ))}
            </Stack>
        </Stack>
    );
}