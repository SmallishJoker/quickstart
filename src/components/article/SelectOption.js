/*
 * @Author: your name
 * @Date: 2021-04-27 21:44:00
 * @LastEditTime: 2021-04-28 20:42:03
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \quickstart\src\components\article\SelectOption.js
 */
import React from "react"
import { Select, Spin } from 'antd';
import debounce from 'lodash/debounce';
import articleService from "../../services/articleService"

function DebounceSelect({ fetchOptions, debounceTimeout = 800, ...props }) {
    const [fetching, setFetching] = React.useState(false);
    const [options, setOptions] = React.useState([]);
    const fetchRef = React.useRef(0);
    const debounceFetcher = React.useMemo(() => {
        const loadOptions = (value) => {
            fetchRef.current += 1;
            const fetchId = fetchRef.current;
            setOptions([]);
            setFetching(true);
            fetchOptions(value).then((newOptions) => {
                if (fetchId !== fetchRef.current) {
                    // for fetch callback order
                    return;
                }

                setOptions(newOptions);
                setFetching(false);
            });
        };

        return debounce(loadOptions, debounceTimeout);
    }, [fetchOptions, debounceTimeout]);
    return (
        <Select
            labelInValue
            filterOption={false}
            onSearch={debounceFetcher}
            notFoundContent={fetching ? <Spin size="small" /> : null}
            {...props}
            options={options}
        />
    );
} // Usage of DebounceSelect

async function fetchUserList(tag_name) {
    return articleService.getTags({
        method: "post",
        body: JSON.stringify({ tag_name }),
    }).then(res => {
        if (res.status === 200) {
            return res.data.map(item => ({
                label: item.tag_name,
                value: item.tag_id,
            }))
        }
    }).catch(err => {
        this.$message.error("服务器错误")
    })
}

export default function SelectOption(props) {
    const [value, setValue] = React.useState([]);
    return (
        <DebounceSelect
            mode="multiple"
            value={value}
            placeholder="选择标签"
            fetchOptions={fetchUserList}
            onChange={(newValue) => {
                setValue(newValue);
                props.handleChange(newValue)
            }}
            style={{
                width: '100%',
            }}
        />
    );
};