/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import {
  Button,
  HTMLInputProps,
  InputGroup,
  Menu,
  MenuItem,
  Popover,
  Position,
} from '@blueprintjs/core';
import { IconNames } from '@blueprintjs/icons';
import classNames from 'classnames';
import React from 'react';

export interface SuggestionGroup {
  group: string;
  suggestions: string[];
}

export interface SuggestibleInputProps extends HTMLInputProps {
  onValueChange: (newValue: string) => void;
  suggestions?: (string | SuggestionGroup)[];
  large?: boolean;
}

export class SuggestibleInput extends React.PureComponent<SuggestibleInputProps> {
  constructor(props: SuggestibleInputProps, context: any) {
    super(props, context);
    // this.state = {};
  }

  renderSuggestionsMenu() {
    const { suggestions, onValueChange } = this.props;
    if (!suggestions) return undefined;

    return (
      <Menu>
        {suggestions.map(suggestion => {
          if (typeof suggestion === 'string') {
            return (
              <MenuItem
                key={suggestion}
                text={suggestion}
                onClick={() => onValueChange(suggestion)}
              />
            );
          } else {
            return (
              <MenuItem key={suggestion.group} text={suggestion.group}>
                {suggestion.suggestions.map(suggestion => (
                  <MenuItem
                    key={suggestion}
                    text={suggestion}
                    onClick={() => onValueChange(suggestion)}
                  />
                ))}
              </MenuItem>
            );
          }
        })}
      </Menu>
    );
  }

  render() {
    const { className, value, defaultValue, onValueChange, large, ...rest } = this.props;
    const suggestionsMenu = this.renderSuggestionsMenu();

    return (
      <InputGroup
        className={classNames('suggestible-input', className)}
        value={value as string}
        defaultValue={defaultValue as string}
        onChange={(e: any) => {
          onValueChange(e.target.value);
        }}
        rightElement={
          suggestionsMenu && (
            <Popover content={suggestionsMenu} position={Position.BOTTOM_RIGHT} autoFocus={false}>
              <Button icon={IconNames.CARET_DOWN} minimal />
            </Popover>
          )
        }
        large={large}
        {...rest}
      />
    );
  }
}
