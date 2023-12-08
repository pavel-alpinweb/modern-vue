import {mount} from '@vue/test-utils';
import {describe, it, expect} from 'vitest';
import FormInput from "./FormInput.vue";
import {computed, defineComponent, ref} from "vue";

// .tsx
describe("FormInput", () => {
    it("tests validation", async () => {
        const Parent = defineComponent({
            components: {FormInput},
            template: `
              <form-input name="foo" v-model="formValue" type="input" :status="status"/>
            `,
            setup() {
                const formValue = ref('foo');
                const status = computed(() => {
                    if (formValue.value.length > 5) {
                        return {
                            valid: true,
                        };
                    } else {
                        return {
                            valid: false,
                            message: 'danger',
                        };
                    }
                });

                return {
                    formValue,
                    status,
                };
            },
        });

        const wrapper = mount(Parent);
        expect(wrapper.find('.is-danger').text()).toBe('danger');

        await wrapper.find('input').setValue('foobar');
        expect(wrapper.find('.is-danger').exists()).toBe(false);
    });

    it("renders some errors", () => {
        const wrapper = mount(FormInput, {
            props: {
                name: 'foo',
                modelValue: 'bar',
                status: {
                    valid: false,
                    message: 'error',
                },
                type: 'input',
            }
        });

        expect(wrapper.find('.is-danger').exists()).toBe(true);
    })

    it("renders no errors", () => {
        const wrapper = mount(FormInput, {
            props: {
                name: 'foo',
                modelValue: 'bar',
                status: {
                    valid: true,
                    message: undefined,
                },
                type: 'input',
            }
        });

        expect(wrapper.find('.is-danger').exists()).toBe(false);
    })
});