// Copyright 2014 The Oppia Authors. All Rights Reserved.
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//      http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS-IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

/**
 * @fileoverview Unit test for the Editor state service.
 */

/* eslint-disable max-len */
import { SolutionValidityService } from
  'pages/exploration-editor-page/editor-tab/services/solution-validity.service';
/* eslint-enable max-len */

require(
  'components/state-editor/state-editor-properties-services/' +
  'state-editor.service.ts');

describe('Editor state service', function() {
  beforeEach(angular.mock.module('oppia'));
  beforeEach(angular.mock.module('oppia', function($provide) {
    $provide.value('SolutionValidityService', new SolutionValidityService());
  }));

  describe('editor state service', function() {
    var ecs = null;

    beforeEach(angular.mock.inject(function($injector) {
      ecs = $injector.get('StateEditorService');
    }));

    it('should correctly set and get state names', function() {
      ecs.setActiveStateName('A State');
      expect(ecs.getActiveStateName()).toBe('A State');
    });

    it('should not allow invalid state names to be set', function() {
      ecs.setActiveStateName('');
      expect(ecs.getActiveStateName()).toBeNull();

      ecs.setActiveStateName(null);
      expect(ecs.getActiveStateName()).toBeNull();
    });

    it('should correctly set and get solicitAnswerDetails', function() {
      expect(ecs.getSolicitAnswerDetails()).toBeNull();
      ecs.setSolicitAnswerDetails(false);
      expect(ecs.getSolicitAnswerDetails()).toEqual(false);
      ecs.setSolicitAnswerDetails(true);
      expect(ecs.getSolicitAnswerDetails()).toEqual(true);
    });

    it('should correctly set and get misconceptionsBySkill', function() {
      var misconceptionsBySkill = {
        skillId1: [0],
        skillId2: [1, 2]
      };
      expect(ecs.getMisconceptionsBySkill()).toEqual({});
      ecs.setMisconceptionsBySkill(misconceptionsBySkill);
      expect(ecs.getMisconceptionsBySkill()).toEqual(misconceptionsBySkill);
    });

    it('should correctly return answer choices for interaction', function() {
      var customizationArgsForMultipleChoiceInput = {
        choices: {
          value: [
            'Choice 1',
            'Choice 2'
          ]
        }
      };
      expect(
        ecs.getAnswerChoices(
          'MultipleChoiceInput', customizationArgsForMultipleChoiceInput)
      ).toEqual([{
        val: 0,
        label: 'Choice 1',
      }, {
        val: 1,
        label: 'Choice 2',
      }]);

      var customizationArgsForImageClickInput = {
        imageAndRegions: {
          value: {
            labeledRegions: [{
              label: 'Label 1'
            }, {
              label: 'Label 2'
            }]
          }
        }
      };
      expect(
        ecs.getAnswerChoices(
          'ImageClickInput', customizationArgsForImageClickInput)
      ).toEqual([{
        val: 'Label 1',
        label: 'Label 1',
      }, {
        val: 'Label 2',
        label: 'Label 2',
      }]);

      var customizationArgsForItemSelectionAndDragAndDropInput = {
        choices: {
          value: [
            'Choice 1',
            'Choice 2'
          ]
        }
      };
      expect(
        ecs.getAnswerChoices(
          'ItemSelectionInput',
          customizationArgsForItemSelectionAndDragAndDropInput)
      ).toEqual([{
        val: 'Choice 1',
        label: 'Choice 1',
      }, {
        val: 'Choice 2',
        label: 'Choice 2',
      }]);
      expect(
        ecs.getAnswerChoices(
          'DragAndDropSortInput',
          customizationArgsForItemSelectionAndDragAndDropInput)
      ).toEqual([{
        val: 'Choice 1',
        label: 'Choice 1',
      }, {
        val: 'Choice 2',
        label: 'Choice 2',
      }]);
    });
  });
});
