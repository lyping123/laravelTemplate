import React from "react";
import { useState } from "react";
import { router } from "@inertiajs/react";
import demo from '@/routes/demo';

function Index() {
    const [name, setName] = useState("");

    const submitForm = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        router.post(demo.store.url(), formData)
    }

    return (
        <>
            <form onClick={submitForm} method="post">
                <div>
                    <label className="block text-sm font-medium text-gray-700">name:</label>
                    <input type="text" className="border border-gray-300 rounded-md" name="name" value={name} onChange={(e) => setName(e.target.value)} />
                    <button type="submit" className="btn btn-primary border border-gray-300 rounded-md">Submit</button>
                </div>
            </form>
        </>

    )
}
export default Index