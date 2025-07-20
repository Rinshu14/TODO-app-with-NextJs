import { Button } from '../components';
import { Popover, PopoverContent, PopoverTrigger, } from "@/components/ui/popover"
import { Tags, X } from 'lucide-react';
import { category } from '@/app/store/types';
import { Separator } from "@/components/ui/separator"
import { Fragment , useState } from 'react'
import useAPIRequest from '@/lib/Hooks/useAPIRequest';
import { httpMethods, taskUrls } from '@/lib/Constants/BackendURLS';
import useCentralStore from '@/app/store/CentralStore';
import { toast } from 'sonner';

interface CategoryOptionsProps {
    selectedCategory: string[]
    id: string | undefined
}

const CategoryOptions = ({ selectedCategory, id }: CategoryOptionsProps) => {

    const updateTask = useCentralStore((state) => state.updateTask)
    const updateSelectedTask = useCentralStore((state) => state.updateSelectedTask)  
     const [isPopOveropen, setIsPopOveropen] = useState(false)

    const { trigger: updateCat, loading } = useAPIRequest(taskUrls.updateTask, httpMethods.patch, {
        onSuccess: (data) => {
            updateTask(data)
            updateSelectedTask(data)
        }
    }, id)

    const updateCategory = (item: category) => {

        setIsPopOveropen(false)
        if (selectedCategory.length > 0 && selectedCategory.includes(item)) {
            toast.error("Categpry is already added")
            return
        }
        updateCat({ category: [...selectedCategory, item] })
    }

    const deleteCategory = (category: string) => {
        let newCategory = selectedCategory.filter((item) => item != category)
        console.log(newCategory)
        updateCat({ category: [...newCategory] })
    }

    return (
        <div className=' flex flex-col items-center w-full'>
            <div className='w-auto'>
                <Popover open={isPopOveropen}>
                    <PopoverTrigger className='flex justify-center' onClick={()=>{setIsPopOveropen(true)}}>
                        <Tags /> <p className='ml-1'>Pick a category</p>
                    </PopoverTrigger>
                    <PopoverContent className=' w-36 flex flex-col justify-evenly'>
                        {
                            Object.values(category).map((item, index) => {
                                return <Fragment key={index} >
                                    <Button variant="ghost" className=' font-semibold' onClick={() => { updateCategory(item) }}> {item}</Button>
                                    {
                                        (index != Object.values(category).length - 1) ? <Separator /> : <></>
                                    }
                                </Fragment>
                            })
                        }


                    </PopoverContent>
                </Popover>
            </div>
            <div className='selectedCategory overflow-y-auto  custom-scroll '>
                {selectedCategory?.map((item, index) => {
                    return <span className="flex justify-between items-center bg-sidebar-border h-8 w-60 mt-2 p-2 text-sm" key={index}>
                        <p className='p-0 m-0'>{item}</p>
                        <Button variant="ghost" onClick={() => { deleteCategory(item) }}><X /></Button>
                    </span>
                })}
            </div>
        </div>
    )
}

export default CategoryOptions